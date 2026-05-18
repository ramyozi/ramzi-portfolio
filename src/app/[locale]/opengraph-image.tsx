import { ImageResponse } from 'next/og';

export const alt = 'Ramzi Benmansour — Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '90px',
          background:
            'linear-gradient(135deg, #0b0b12 0%, #14141f 55%, #201c42 100%)',
          color: '#fafafa',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: '#a5b4fc',
            fontSize: 30,
            letterSpacing: 5,
          }}
        >
          <div
            style={{
              width: 48,
              height: 6,
              background: '#6366f1',
              borderRadius: 4,
              display: 'flex',
            }}
          />
          PORTFOLIO
        </div>

        <div
          style={{
            fontSize: 108,
            fontWeight: 700,
            marginTop: 30,
            lineHeight: 1.05,
            letterSpacing: -2,
          }}
        >
          Ramzi Benmansour
        </div>

        <div style={{ fontSize: 38, color: '#a1a1aa', marginTop: 30 }}>
          Projects · Experience · Skills
        </div>
      </div>
    ),
    { ...size }
  );
}
