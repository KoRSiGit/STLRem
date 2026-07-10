import { useState, useEffect } from 'react';
import { googleSignIn, initAuth, logout, getAccessToken } from '../lib/firebaseAuth';
import { User } from 'firebase/auth';
import { Cloud, CheckCircle2, AlertTriangle, RefreshCw, LogOut, ArrowRight, Folder, Image as ImageIcon } from 'lucide-react';

interface GoogleDriveSyncProps {
  lang: 'ru' | 'en';
}

export default function GoogleDriveSync({ lang }: GoogleDriveSyncProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [folderId, setFolderId] = useState('15-Uih-DR8VDwsn3VKgH3t5JXTS_HI2d-');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<{
    success: boolean;
    syncedCount: number;
    files: { name: string; path: string; galleryId: string }[];
    debugInfo?: { id: string; name: string; mimeType: string }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setError(lang === 'ru' ? 'Ошибка входа: ' + err.message : 'Login failed: ' + err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setSyncResult(null);
      setError(null);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSync = async () => {
    const activeToken = token || (await getAccessToken());
    if (!activeToken) {
      setError(lang === 'ru' ? 'Сначала авторизуйтесь через Google' : 'Please authenticate with Google first');
      return;
    }

    // Extract folder ID from URL if user pastes the whole link (safely supporting hyphens)
    let cleanFolderId = folderId.trim();
    const folderUrlMatch = cleanFolderId.match(/\/folders\/([a-zA-Z0-9_\-]+)/);
    if (folderUrlMatch) {
      cleanFolderId = folderUrlMatch[1];
    }

    setIsSyncing(true);
    setError(null);
    setSyncResult(null);

    try {
      const res = await fetch('/api/drive/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          folderId: cleanFolderId,
          accessToken: activeToken,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      const data = await res.json();
      setSyncResult(data);
    } catch (err: any) {
      console.error(err);
      setError(
        lang === 'ru'
          ? 'Синхронизация не удалась. Убедитесь, что у вас есть доступ к папке: ' + err.message
          : 'Sync failed. Make sure you have access to the folder: ' + err.message
      );
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-none border border-gray-200 shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <Cloud className="h-8 w-8 text-[#e65410]" />
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wide text-[#00242a]">
                {lang === 'ru' ? 'Синхронизация с Google Диском' : 'Google Drive Catalog Sync'}
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                {lang === 'ru'
                  ? 'Загрузка и привязка оригинальных изображений каталога оборудования'
                  : 'Download and link equipment catalog photos from drive'}
              </p>
            </div>
          </div>

          <div className="mb-6 bg-[#f0f9fa] border border-[#d2eff2] p-4.5 text-xs text-[#004e59] leading-relaxed">
            <p className="font-bold mb-1">
              {lang === 'ru' ? 'Как это работает:' : 'How it works:'}
            </p>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                {lang === 'ru'
                  ? 'Войдите под вашей учетной записью Google с правами на просмотр папки'
                  : 'Sign in with your Google Account having permissions to access the folder'}
              </li>
              <li>
                {lang === 'ru'
                  ? 'Укажите ID папки (по умолчанию установлен предоставленный вами каталог)'
                  : 'Provide the Folder ID (pre-filled with your provided catalog)'}
              </li>
              <li>
                {lang === 'ru'
                  ? 'Нажмите "Синхронизировать" – приложение автоматически скачает фотографии и сопоставит их с разделами оборудования'
                  : 'Click "Start Sync" – the app will fetch the pictures and map them to matching layout slots'}
              </li>
            </ul>
          </div>

          {!user ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
              <p className="text-sm text-gray-600">
                {lang === 'ru'
                  ? 'Для синхронизации требуется авторизация в Google Drive:'
                  : 'Authentication with Google Drive is required to continue:'}
              </p>

              {/* Styled Sign In with Google Button */}
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="gsi-material-button inline-flex items-center justify-center border border-gray-300 rounded-none bg-white hover:bg-gray-50 text-gray-700 px-6 py-2.5 shadow-sm font-bold transition duration-150 cursor-pointer text-sm"
              >
                <div className="gsi-material-button-content-wrapper flex items-center space-x-3">
                  <div className="gsi-material-button-icon h-5 w-5">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={{ display: 'block' }}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents font-medium">
                    {isLoggingIn ? (lang === 'ru' ? 'Вход...' : 'Signing in...') : (lang === 'ru' ? 'Войти через Google' : 'Sign in with Google')}
                  </span>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Authenticated User Status */}
              <div className="flex items-center justify-between bg-gray-50 border border-gray-150 p-4 rounded-none">
                <div className="flex items-center space-x-3">
                  {user.photoURL && (
                    <img src={user.photoURL} alt={user.displayName || ''} className="h-9 w-9 rounded-full" referrerPolicy="no-referrer" />
                  )}
                  <div>
                    <p className="text-sm font-bold text-gray-800">{user.displayName || user.email}</p>
                    <p className="text-[10px] text-teal-650 font-mono uppercase font-semibold">
                      {lang === 'ru' ? '✓ Google-аккаунт подключен' : '✓ Google account connected'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-1.5 border border-gray-200 text-xs text-gray-500 hover:text-red-650 hover:bg-red-50 hover:border-red-100 font-bold uppercase tracking-wider rounded-none transition cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>{lang === 'ru' ? 'Выйти' : 'Logout'}</span>
                </button>
              </div>

              {/* Folder ID input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-gray-700">
                  {lang === 'ru' ? 'Ссылка или ID папки Google Диска:' : 'Google Drive Folder Link or ID:'}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={folderId}
                    onChange={(e) => setFolderId(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="flex-1 bg-white border border-gray-350 px-3 py-2 text-xs font-mono focus:outline-none focus:border-[#e65410]"
                  />
                  <button
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="bg-[#e65410] hover:bg-orange-600 disabled:bg-gray-450 text-white font-bold uppercase text-xs px-5 py-2 rounded-none tracking-wider transition-all duration-150 cursor-pointer flex items-center space-x-2 shadow-sm"
                  >
                    {isSyncing ? (
                      <>
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        <span>{lang === 'ru' ? 'Синхронизация...' : 'Syncing...'}</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>{lang === 'ru' ? 'Синхронизировать' : 'Sync Catalog'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Error and Alert States */}
          {error && (
            <div className="mt-6 flex items-start space-x-2.5 bg-red-50 border-l-4 border-red-500 p-4 text-xs text-red-700">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">{lang === 'ru' ? 'Ошибка' : 'Error'}</p>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Sync Success Results */}
          {syncResult && (
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-5 rounded-none animate-fadeIn">
              <div className="flex items-center space-x-2.5 mb-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
                <h3 className="text-sm font-bold text-green-800">
                  {lang === 'ru'
                    ? `Успешно синхронизировано ${syncResult.syncedCount} файлов!`
                    : `Successfully synced ${syncResult.syncedCount} files!`}
                </h3>
              </div>
              <p className="text-xs text-green-700 mb-4 leading-relaxed">
                {lang === 'ru'
                  ? 'Фотографии были успешно закачаны на сайт и размещены по категориям на карточках оборудования и кнопках каталога!'
                  : 'Images are downloaded, cached locally, and linked to corresponding catalog equipment segments!'}
              </p>

              {syncResult.files.length > 0 && (
                <div className="max-h-48 overflow-y-auto border border-green-200 bg-white/60 p-3 font-mono text-[10.5px] text-gray-700 space-y-1.5 rounded-none">
                  {syncResult.files.map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between border-b border-green-100 pb-1">
                      <span className="flex items-center gap-1.5">
                        <ImageIcon className="h-3 w-3 text-green-600" />
                        <span>{f.name}</span>
                      </span>
                      <span className="flex items-center gap-1 text-green-800">
                        <Folder className="h-3 w-3" />
                        <span className="font-bold">[{f.galleryId}]</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {syncResult.debugInfo && syncResult.debugInfo.length > 0 && (
                <div className="mt-4 border-t border-green-200/50 pt-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-green-800 mb-2">
                    {lang === 'ru' 
                      ? 'Содержимое папки на верхнем уровне Google Диска (найдено объектов: ' + syncResult.debugInfo.length + '):' 
                      : 'Folder contents at the root of Google Drive (found: ' + syncResult.debugInfo.length + '):'}
                  </h4>
                  <div className="max-h-48 overflow-y-auto border border-green-200 bg-white/60 p-3 font-mono text-[10.5px] text-gray-700 space-y-1.5 rounded-none">
                    {syncResult.debugInfo.map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between border-b border-green-100 pb-1">
                        <span className="flex items-center gap-1.5 truncate pr-2">
                          {f.mimeType === 'application/vnd.google-apps.folder' ? (
                            <Folder className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                          ) : (
                            <ImageIcon className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          )}
                          <span className="font-bold truncate">{f.name}</span>
                        </span>
                        <span className="text-[9px] text-gray-400 font-mono shrink-0">
                          {f.mimeType === 'application/vnd.google-apps.folder' ? 'Folder' : 'File'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
