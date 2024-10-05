import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import '../entrypoints/popup/style.css';
import SuggestionIcon from '../assets/suggestion.svg';

const LinkedInReplyIcon = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLElement | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

    const handleModalSubmit = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (isLinkedInTextarea(target)) {
        console.log('LinkedIn textarea focused');
        textareaRef.current = target;
        positionIcon(target);

        setIsVisible(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.relatedTarget as Node)) {
        setIsVisible(false);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  const isLinkedInTextarea = (element: HTMLElement): boolean => {
    return (
      element.tagName === 'DIV' &&
      element.getAttribute('role') === 'textbox' &&
      element.getAttribute('contenteditable') === 'true'
    );
  };

  const positionIcon = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    if (iconRef.current) {
      iconRef.current.style.top = `${rect.bottom + window.scrollY - 40}px`;
      iconRef.current.style.left = `${rect.right + window.scrollX - 45}px`;
    }
  };

  const handleInsert = (text: string) => {
    console.log('Inserting text:', text);
    if (textareaRef.current) {
      // Get the contenteditable div
      const contentEditableDiv = textareaRef.current;

      // Create a new text node with the generated text
      const textNode = document.createTextNode(text);

      // Get the current selection
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        // Get the current range
        const range = selection.getRangeAt(0);

        // Insert the text at the current cursor position
        range.insertNode(textNode);

        // Move the cursor to the end of the inserted text
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        // If there's no selection, append the text to the end
        contentEditableDiv.appendChild(textNode);
      }

      // Trigger an input event to notify LinkedIn that the content has changed
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      contentEditableDiv.dispatchEvent(inputEvent);

      // Focus on the contenteditable div
      contentEditableDiv.focus();
    }
    setIsModalOpen(false);
  };

  return (
    <>
    <div
      ref={iconRef}
      style={{
        position: 'absolute',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 9999,
        display: isVisible ? 'block' : 'none',
      }}
      onClick={handleClick}
      onMouseDown={(e)=> e.preventDefault()}
    >
      <img src={SuggestionIcon} alt="suggestion icon" />
    </div>
     <Modal
     isOpen={isModalOpen}
     onInsert={handleInsert}
     onClose={handleModalClose}
     onSubmit={handleModalSubmit}
   />
   </>
  );
};

export default LinkedInReplyIcon;
