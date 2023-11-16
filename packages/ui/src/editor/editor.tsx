'use client';

import { useState } from 'react';

import { Pagination } from '../pagination/pagination';
import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';

import type { EditorProps } from './editor.types';

export const Editor = ({ scheme, setScheme }: EditorProps) => {
  const [page, setPage] = useState(1);

  return (
    <div className="m-auto max-w-md w-full flex flex-col gap-4">
      <EditorToolBar scheme={scheme} setScheme={setScheme} />
      <EditorGrid page={page - 1} scheme={scheme} setScheme={setScheme} />
      <Pagination
        page={page}
        handleChange={(pageIndex) => setPage(pageIndex)}
        count={scheme.frames.length}
      />
    </div>
  );
};
