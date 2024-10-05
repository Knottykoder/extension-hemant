import React from "react";
import { createRoot } from "react-dom/client";
import LinkedInReplyIcon from "../components/LinkedinReply";
import './popup/style.css';
import './popup/App.css'

export default defineContentScript({
  matches:  ['https://*.linkedin.com/*'],
  cssInjectionMode: 'ui',
  async  main(ctx) {

  //   const indicator = document.createElement('div')
  //   indicator.textContent = 'LinkedIn Helper Active'
  //   indicator.style.position = 'fixed'
  //   indicator.style.top = '10px'
  //   indicator.style.right = '10px'
  //   indicator.style.backgroundColor = 'yellow'
  //   indicator.style.padding = '5px'
  //   indicator.style.zIndex = '9999'
  //   document.body.appendChild(indicator)

  //   document.addEventListener('focusin', (e) => {
  //     const target = e.target as HTMLElement
  //     if (isLinkedInTextarea(target)) {
  //       console.log('LinkedIn textarea focused')
  //       indicator.style.backgroundColor = 'green'
  //     }
  //   })

  //   document.addEventListener('focusout', () => {
  //     indicator.style.backgroundColor = 'yellow'
  //   })

  //   function isLinkedInTextarea(element: HTMLElement): boolean {
  //     return (
  //       element.tagName === 'DIV' &&
  //       element.getAttribute('role') === 'textbox' &&
  //       element.getAttribute('contenteditable') === 'true'
  //     )
  //   }
  // },
  console.log('LinkedIn Helper Extension loaded')

//   const icon = document.createElement('div')
//   icon.textContent = '✏️' // Using an emoji as a simple icon
//   icon.style.position = 'absolute'
//   icon.style.fontSize = '20px'
//   icon.style.cursor = 'pointer'
//   icon.style.zIndex = '9999'
//   icon.style.display = 'none'
//   document.body.appendChild(icon)

//   document.addEventListener('focusin', (e) => {
//     const target = e.target as HTMLElement
//     if (isLinkedInTextarea(target)) {
//       console.log('LinkedIn textarea focused')
//       positionIcon(target)
//       icon.style.display = 'block'
//     }
//   })

//   document.addEventListener('focusout', (e) => {
//     if (!icon.contains(e.relatedTarget as Node)) {
//       icon.style.display = 'none'
//     }
//   })

//   function isLinkedInTextarea(element: HTMLElement): boolean {
//     return (
//       element.tagName === 'DIV' &&
//       element.getAttribute('role') === 'textbox' &&
//       element.getAttribute('contenteditable') === 'true'
//     )
//   }

//   function positionIcon(element: HTMLElement) {
//     const rect = element.getBoundingClientRect()
//     icon.style.top = `${rect.top + window.scrollY + 5}px`
//     icon.style.left = `${rect.right + window.scrollX - 25}px`
//   }

//   icon.addEventListener('click', () => {
//     alert('Grammar checking icon clicked!')
//     // Here you would typically show grammar suggestions
//   })
// },

const ui = await createShadowRootUi(ctx, {
  name: 'linkedin-reply',
  position: 'inline',
  anchor: 'body',
  append: 'first',
  onMount: (container) => {
    const root = createRoot(container);
    root.render(React.createElement(LinkedInReplyIcon));
    return root;
  },
  onRemove: (root) => {
    root?.unmount();
  },
});

ui.mount();

// const container = document.createElement('div');
//   document.body.appendChild(container);
//   const root = createRoot(container);
//   root.render(React.createElement(GrammarCheckIcon));
  },
});