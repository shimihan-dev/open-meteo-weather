import React from 'react';

const VersionInfo: React.FC = () => {
  const version = process.env.REACT_APP_VERSION || '1.0.0';
  const buildDate = process.env.REACT_APP_BUILD_DATE || new Date().toISOString();

  return (
    <div className="version-info">
      <span>v{version}</span>
      <span className="build-date">
        {new Date(buildDate).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </span>
    </div>
  );
};

export default VersionInfo; 