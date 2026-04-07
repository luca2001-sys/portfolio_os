

export const SingleVideo = ({ id, ratio = "16/9", autoPlay = false }: { id: string, ratio?: string, autoPlay?: boolean }) => {
  const containerStyle: React.CSSProperties = {
    width: '100%',
    marginBottom: '10px',
    position: 'relative',
    backgroundColor: '#000',
    aspectRatio: ratio
  };

  const iframeStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };

  const getUrl = (id: string, isAuto: boolean) => {
    let base = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`;
    if (isAuto) base += `&autoplay=1&mute=1&loop=1&playlist=${id}`;
    return base;
  };

  return (
    <div style={containerStyle}>
      <iframe
        style={iframeStyle}
        src={getUrl(id, autoPlay)}
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};

export const DoubleVideo = ({
  leftId,
  rightId,
  ratio = "16/9",
  autoPlayLeft = false,
  autoPlayRight = false
}: {
  leftId: string,
  rightId: string,
  ratio?: string,
  autoPlayLeft?: boolean,
  autoPlayRight?: boolean
}) => {

  const commonStyle: React.CSSProperties = { flex: '1 1 300px', position: 'relative', aspectRatio: ratio };
  const iframeStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' };

  const getUrl = (id: string, isAuto: boolean) => {
    let base = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`;
    if (isAuto) {
      base += `&autoplay=1&mute=1&loop=1&playlist=${id}`;
    }
    return base;
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', width: '100%', marginBottom: '10px' }}>
      <div style={commonStyle}>
        <iframe
          style={iframeStyle}
          src={getUrl(leftId, autoPlayLeft)}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <div style={commonStyle}>
        <iframe
          style={iframeStyle}
          src={getUrl(rightId, autoPlayRight)}
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    </div>
  );
};
