/**
 * Modified from work by Ashwani Arya
 */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';

const config = {
  success: {
    primaryColor: '#2CC51F',
    secondaryColor: 'green',
    label: 'Success notification!',
  },
  info: {
    primaryColor: 'grey',
    secondaryColor: 'grey',
    label: 'Info notification!',
  },
  error: {
    primaryColor: '#F55C2C',
    secondaryColor: 'red',
    label: 'Error notification!',
  },
  warn: {
    primaryColor: 'orange',
    secondaryColor: 'orange',
    label: 'Warning notification!',
  },
};

class ToastTop extends React.Component {
  componentDidMount() {
    const { duration } = this.props;
    this.timeout = setTimeout(() => {
      const { targetId } = this.props;
      this.remove(targetId);
    }, duration * 1000);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  remove(id) {
    unmountComponentAtNode(document.getElementById(id));
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  }

  render() {
    const {
      title, type, message, duration,
    } = this.props;
    return (
      <div className="toast-message-container">
        <div id="toast-message" className="toast-message">
          {/* Message to be added here */}
          <div className="title">{title || config[type].label}</div>
          <div>{ message }</div>
        </div>
        {/* Static Styling */}
        <style jsx>
          {`
          .toast-message {
            flex:1;
            background-color: #fff;
            padding: 16px 16px;
            border-radius: 5px;
            font-family: 'Open Sans', sans-serif;
            font-size: 1rem;
            border-left: 12px solid ${config[type].primaryColor};
          }
          .title {
            margin-bottom: 8px;
            color: ${config[type].primaryColor};
            font-family: 'Playfair Display', serif;
            font-weight: bold;
            font-size: 1.2rem;
          }
        `}
        </style>
        {/* Dynamic Styling */}
        <style jsx>
          {`
            @keyframes SlideInOutTop {
              0%{
                transform: translateY(-40px);
                opacity:0;
              }
              6% {
                transform: translateY(0px);
                opacity:1;
              }
              94% {
                transform: translateY(0px);
                opacity:1;
              }
              100% {
                transform: translateY(-40px);
                opacity:0;
              }
            }
            .toast-message-container {
                color: #444;
                width: 23rem;
                max-width: 23rem;
                box-shadow: 0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2);
                margin: 0px 1rem;
                border-radius: 5px;
                animation: SlideInOutTop ${duration}s ease-in-out;
            }
            @media (max-width: 400px) {
              .toast-message-container {
                width: 300px;
              }
            }
        `}
        </style>
      </div>
    );
  }
}
// toast object
export const toast = {
  remove: (id) => {
    const comId = id || 'toast-container';
    const doc = document.getElementById(comId);
    if (doc) unmountComponentAtNode(doc);
  },
  notify: (message, options = null) => {
    let duration = 5;
    let type = 'info';
    let targetId = 'toast-container';
    let title = null;
    // const position = 'top';
    let onRemove = null;
    if (options) {
      if (options.duration) {
        duration = options.duration;
      }
      if (options.type) {
        type = options.type;
      }
      if (options.targetId) {
        targetId = options.targetId;
      }
      if (options.title) {
        title = options.title;
      }
      if (options.onRemove) {
        onRemove = options.onRemove;
      }
    }
    const trasitionPercentage = 0.3 * (100 / duration);
    render(<ToastTop
      message={message}
      slideIn
      type={type || 'info'}
      transitionPercentage={trasitionPercentage}
      targetId={targetId}
      title={title}
      onRemove={onRemove}
      duration={duration}
    />, document.getElementById(targetId));
  },
};

// Toast container
export const ToastContainer = ({ id, align }) => {
  const useId = id || 'toast-container';
  return (
    <div id={useId} className="toast-container">
      <style jsx>
        {`
        .toast-container {
          position: fixed;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          left: 0px;
          height: 0px;
          background-color:red;
        }
        .toast-container {
          position: fixed;
          width: 100%;
          top: 20px;
          display: flex;
          flex-direction: column;
          align-items: ${
            (() => {
              if (!align) return 'flex-end';
              if (align === 'center') return 'center';
              if (align === 'left') return 'flex-start';
              if (align === 'right') return 'flex-end';
              return 'flex-end';
            })()
          };
          left: 0px;
        }
      `}
      </style>
    </div>
  );
};
