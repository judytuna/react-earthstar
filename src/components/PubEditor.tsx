import React from 'react';
import { useWorkspacePubs } from '../hooks';

export default function PubEditor({ workspace }: { workspace: string }) {
  const [pubToAdd, setPubToAdd] = React.useState('');
  const [pubs, setPubs] = useWorkspacePubs(workspace);

  const removePub = React.useCallback(
    (pubToRemove: string) => {
      setPubs(prev => prev.filter(pub => pub !== pubToRemove));
    },
    [setPubs]
  );

  const addPub = React.useCallback(
    (pubToAdd: string) => {
      setPubToAdd('');
      setPubs(prev => [...prev, pubToAdd]);
    },
    [setPubs, setPubToAdd]
  );

  return (
    <>
      {pubs.length > 0 ? (
        <ul data-react-earthstar-pubeditor-list>
          {pubs.map(pubUrl => {
            return (
              <li data-react-earthstar-pubeditor-list-item key={`${pubUrl}`}>
                <a href={'pubUrl'}>{pubUrl}</a>
                <button
                  data-react-earthstar-pubeditor-list-item-delete-button
                  onClick={() => removePub(pubUrl)}
                >
                  {'Remove pub'}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
      <form
        data-react-earthstar-pubeditor-add-form
        onSubmit={e => {
          e.preventDefault();
          if (pubToAdd.length > 0) {
            addPub(pubToAdd);
          }
        }}
      >
        <label
          data-react-earthstar-pubeditor-newpub-label
          htmlFor={'pub-to-add'}
        >
          {'Pub URL'}
        </label>
        <input
          data-react-earthstar-pubeditor-newpub-input
          type="url"
          name={'pub-to-add'}
          value={pubToAdd}
          onChange={e => setPubToAdd(e.target.value)}
          placeholder={'https://my.pub/'}
        />
        <button data-react-earthstar-pubeditor-add-button type={'submit'}>
          {'Add new pub'}
        </button>
      </form>
    </>
  );
}
