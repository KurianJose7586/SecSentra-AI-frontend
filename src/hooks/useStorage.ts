import { useState } from 'react';
import { uploadFile, deleteFile, downloadFile, UploadResult } from '../lib/storage';
import { useAuth } from './useAuth';

export const useStorage = () => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const upload = async (file: File): Promise<UploadResult | null> => {
    if (!user) {
      setError('User not authenticated');
      return null;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const result = await uploadFile(file, user.uid);
      
      if (result.error) {
        setError(result.error);
        return null;
      }

      setUploadProgress(100);
      return result;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const remove = async (path: string): Promise<boolean> => {
    setError(null);
    try {
      return await deleteFile(path);
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };

  const download = async (path: string): Promise<Blob | null> => {
    setError(null);
    try {
      return await downloadFile(path);
    } catch (err: any) {
      setError(err.message);
      return null;
    }
  };

  return {
    upload,
    remove,
    download,
    uploading,
    uploadProgress,
    error,
  };
};