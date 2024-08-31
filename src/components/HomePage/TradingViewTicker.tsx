import { useEffect } from 'react';

const TradingViewTicker = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: 'FOREXCOM:SPXUSD',
          title: 'S&P 500 Index',
        },
        {
          proName: 'FOREXCOM:NSXUSD',
          title: 'US 100 Cash CFD',
        },
        {
          proName: 'FX_IDC:EURUSD',
          title: 'EUR to USD',
        },
        {
          proName: 'BITSTAMP:BTCUSD',
          title: 'Bitcoin',
        },
        {
          proName: 'BITSTAMP:ETHUSD',
          title: 'Ethereum',
        },
      ],
      showSymbolLogo: true,
      isTransparent: true,
      displayMode: 'adaptive',
      colorTheme: 'dark',
      locale: 'en',
    });
    document.getElementsByClassName('tradingview-widget-container__widget')[0].appendChild(script);

    return () => {};
  }, []);

  return (
    <div className="absolute bottom-[5.2vh] w-full tradingview-widget-container">
      <div className="tradingview-widget-container__widget" />
      <div className="tradingview-widget-copyright">
        <a
          aria-label="TradingView widget"
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        />
      </div>
    </div>
  );
};

export default TradingViewTicker;
