import { supabase } from './supabase';

export interface UploadResult {
  path: string;
  url: string;
  error?: string;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  'text/plain',
  'text/html',
  'text/css',
  'text/javascript',
  'application/json',
  'application/javascript',
  'application/xml',
  'text/xml',
  'application/yaml',
];

export const uploadFile = async (
  file: File,
  userId: string
): Promise<UploadResult> => {
  if (file.size > MAX_FILE_SIZE) {
    return { path: '', url: '', error: 'File size exceeds 10MB limit' };
  }

  if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(txt|json|js|ts|py|java|cpp|c|yaml|yml|xml|html|css)$/i)) {
    return { path: '', url: '', error: 'Invalid file type' };
  }

  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filePath = `uploads/${userId}/${timestamp}_${sanitizedName}`;

  try {
    const { data, error } = await supabase.storage
      .from('security-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      return { path: '', url: '', error: error.message };
    }

    const { data: urlData } = supabase.storage
      .from('security-files')
      .getPublicUrl(filePath);

    return {
      path: data.path,
      url: urlData.publicUrl,
    };
  } catch (error: any) {
    return { path: '', url: '', error: error.message };
  }
};

export const getFileUrl = (path: string): string => {
  const { data } = supabase.storage
    .from('security-files')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

export const deleteFile = async (path: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage
      .from('security-files')
      .remove([path]);

    return !error;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

export const downloadFile = async (path: string): Promise<Blob | null> => {
  try {
    const { data, error } = await supabase.storage
      .from('security-files')
      .download(path);

    if (error) {
      console.error('Download error:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Download error:', error);
    return null;
  }
};

export const createSignedUrl = async (
  path: string,
  expiresIn: number = 3600
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage
      .from('security-files')
      .createSignedUrl(path, expiresIn);

    if (error) {
      console.error('Signed URL error:', error);
      return null;
    }

    return data.signedUrl;
  } catch (error) {
    console.error('Signed URL error:', error);
    return null;
  }
};