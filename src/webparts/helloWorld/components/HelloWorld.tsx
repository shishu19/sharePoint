/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import styles from './HelloWorld.module.scss';
import type { IHelloWorldProps } from './IHelloWorldProps';

interface Marker {
  top: number;
  left: number;
  imageUrl: string;
  label: string;
  popupContent: string;
}

interface HelloWorldState {
  mapContainer: HTMLDivElement | null;
  markers: JSX.Element[];
}

interface PopupProps {
  content: string;
}

const Popup: React.FC<PopupProps> = ({ content }) => (
  <div className={styles.popup} style={{ display: 'none' }}>
    {content}
    <span className={styles.closeButton}>×</span>
  </div>
);

class HelloWorld extends React.Component<IHelloWorldProps, HelloWorldState> {
  constructor(props: IHelloWorldProps) {
    super(props);
    this.state = {
      mapContainer: null,
      markers: [],
    };
  }

  public createMarker(top: number, left: number, imageUrl: string, label: string, popupContent: string): JSX.Element {
    return (
      <div
        className={styles.marker}
        style={{ top: `${top}%`, left: `${left}%` }}
        onClick={() => this.togglePopup(imageUrl, popupContent)}
        key={label}
      >
        <img src={imageUrl} alt={label} />
        <div className={styles.label}>{label}</div>
        <Popup content={popupContent} />
      </div>
    );
  }

  public togglePopup = (imageUrl: string, popupContent: string) => {
    const popup = document.querySelector(`.${styles.popup}`) as HTMLElement;
  
    if (!popup) {
      return;
    }
  
    const popupStyle = popup.style;
    const isPopupVisible = popupStyle.display === 'block';
  
    if (isPopupVisible) {
      popupStyle.display = 'none';
    } else {
      // Customize the logic to position the popup as needed
      popupStyle.display = 'block';
      popupStyle.top = '50%';
      popupStyle.left = '50%';
      // Other positioning logic...
  
      // Set the content or image source based on your requirements
      popup.innerHTML = `<img src="${imageUrl}" alt="Marker Popup" />${popupContent}`;
    }
  };
  

  public componentDidMount() {
    const markerCoordinates: Marker[] = [
      { top: 78, left: 25, imageUrl: require('../../helloWorld/assets/1.png'), popupContent: 'Marker 1 Marker 1 Marker 1', label: 'ready' },
      { top: 62, left: 38, imageUrl: require('../../helloWorld/assets/2.png'), popupContent: 'Marker 2', label: 'mark' },
      { top: 48, left: 48, imageUrl: require('../../helloWorld/assets/3.png'), popupContent: 'Marker 3', label: 'Add' },
      { top: 34, left: 59, imageUrl: require('../../helloWorld/assets/4.png'), popupContent: 'Marker 4', label: 'Adedcc d' },
      { top: 23, left: 68, imageUrl: require('../../helloWorld/assets/5.png'), popupContent: 'Marker 5', label: 'Add' },
      { top: 10, left: 78, imageUrl: require('../../helloWorld/assets/6.png'), popupContent: 'Marker 6', label: 'Adddf c' }
    ];

    const markers: JSX.Element[] = markerCoordinates.map((marker) =>
      this.createMarker(marker.top, marker.left, marker.imageUrl, marker.label, marker.popupContent)
    );

    this.setState({
      mapContainer: document.querySelector(`.${styles.mapContainer}`) as HTMLDivElement,
      markers: markers,
    });
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    const { hasTeamsContext } = this.props;

    return (
      <section className={`${styles.helloWorld} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.mapContainer} id={styles.mapContainer}>
          {this.state.mapContainer && this.state.markers}
        </div>
      </section>
    );
  }
}

export default HelloWorld;
