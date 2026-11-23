import { ImageResponse } from 'next/og';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Deniz Tören — Finance, Markets, Perspectives';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#172B45',
        color: '#F7F5F0',
        padding: '80px',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          letterSpacing: 6,
          color: '#B99562',
        }}
      >
        FINANCE · MARKETS · PERSPECTIVES
      </div>
      <div style={{ display: 'flex', fontFamily: 'serif', fontSize: 102 }}>
        DENİZ TÖREN
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 29,
          borderTop: '1px solid #B99562',
          paddingTop: 28,
        }}
      >
        Rakamların ötesinde, büyük resme bakış.
      </div>
    </div>,
    size,
  );
}
