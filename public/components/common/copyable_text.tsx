/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useState, useRef } from 'react';
import { EuiButtonIcon, copyToClipboard, EuiToolTip } from '@elastic/eui';

interface Props {
  text: string;
  iconLeft: boolean; // whether icon is in the left of text
}
export const CopyableText = ({ text, iconLeft }: Props) => {
  const [isTextCopied, setTextCopied] = useState(false);
  const copyButtonRef = useRef<HTMLAnchorElement>(null);

  const onClick = useCallback(() => {
    copyButtonRef?.current?.focus(); // sets focus for safari
    copyToClipboard(text);
    setTextCopied(true);
  }, [text, setTextCopied]);
  const onBlur = useCallback(() => {
    setTextCopied(false);
  }, [setTextCopied]);
  return (
    <div data-test-subj="copyable-text-div">
      {iconLeft ? null : text}
      <EuiToolTip content={isTextCopied ? 'ID copied to clipboard' : 'Copy ID'}>
        <EuiButtonIcon
          buttonRef={copyButtonRef}
          aria-label="Copy ID to clipboard"
          color="text"
          data-test-subj="copy-id-button"
          iconType="copy"
          onClick={onClick}
          onBlur={onBlur}
        />
      </EuiToolTip>
      {iconLeft ? text : null}
    </div>
  );
};