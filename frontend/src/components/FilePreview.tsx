import { useEffect, useState } from 'react';
import api from '../api';

interface File {
  id: number;
  original_name: string;
  mime_type: string;
  size: number;
}

interface FilePreviewProps {
  file: File;
  onClose: () => void;
}

const FilePreview = ({ file, onClose }: FilePreviewProps) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPreview();
  }, [file.id]);

  const loadPreview = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/files/download/${file.id}`, {
        responseType: 'blob',
      });

      const url = URL.createObjectURL(response.data);
      setPreviewUrl(url);
      setError('');
    } catch (err) {
      setError('Failed to load preview');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await api.get(`/files/download/${file.id}`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', file.original_name);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const canPreview = () => {
    return (
      file.mime_type.startsWith('image/') ||
      file.mime_type.startsWith('video/') ||
      file.mime_type.includes('pdf')
    );
  };

  const renderPreview = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-96 bg-gray-100 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading preview...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center h-96 bg-red-50 rounded-xl">
          <div className="text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        </div>
      );
    }

    if (!canPreview()) {
      return (
        <div className="flex justify-center items-center h-96 bg-gradient-to-br from-gray-100 to-blue-100 rounded-xl">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-gray-700 font-semibold text-lg mb-2">Preview not available</p>
            <p className="text-gray-500 mb-6">This file type cannot be previewed</p>
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg"
            >
              <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download File
            </button>
          </div>
        </div>
      );
    }

    if (file.mime_type.startsWith('image/')) {
      return (
        <img
          src={previewUrl}
          alt={file.original_name}
          className="max-w-full max-h-[70vh] mx-auto rounded-xl shadow-2xl"
        />
      );
    }

    if (file.mime_type.startsWith('video/')) {
      return (
        <video
          controls
          src={previewUrl}
          className="max-w-full max-h-[70vh] mx-auto rounded-xl shadow-2xl"
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (file.mime_type.includes('pdf')) {
      return (
        <iframe
          src={previewUrl}
          className="w-full h-[70vh] rounded-xl shadow-2xl border-2 border-gray-200"
          title={file.original_name}
        />
      );
    }

    return null;
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto bg-gray-900 bg-opacity-90 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-2xl p-8 max-w-6xl w-full shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 min-w-0 pr-4">
              <h3 className="text-2xl font-bold text-gray-900 truncate mb-2">{file.original_name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  {file.mime_type}
                </span>
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                  </svg>
                  {formatFileSize(file.size)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {canPreview() && (
                <button
                  onClick={handleDownload}
                  className="p-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
                  title="Download"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="p-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                title="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4">
            {renderPreview()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
