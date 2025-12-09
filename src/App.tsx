import { useRef, useState } from 'react';
import cn from 'clsx';
import useStateMachine, { t } from '@cassiozen/usestatemachine';

import css from './App.module.css';

const LOGO = ['Design', 'Systems', 'International'];

function App() {
  const ref = useRef<HTMLInputElement>(null);
  const [passwordLength, setPasswordLength] = useState(0);

  const [state, send] = useStateMachine({
    schema: {
      events: {
        SUBMIT: t<{ data: FormData }>(),
      },
    },
    initial: 'idle',
    states: {
      idle: {
        on: { SUBMIT: 'submitting' },
        effect() {
          ref.current?.focus();
        },
      },
      error: {
        on: { SUBMIT: 'submitting' },
        effect() {
          ref.current?.focus();
        },
      },
      submitting: {
        on: { ERROR: 'error' },
        effect({ event, send }: {
          event: { type: 'SUBMIT', data: FormData },
          send: (type: 'ERROR') => void,
        }) {
          fetch('/auth/authenticate', {
            method: 'POST',
            body: event.data
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.success === true) {
                const urlParams = new URLSearchParams(window.location.search);
                const next = urlParams.get('next') || '/';
                window.location.href = next;
              } else {
                send('ERROR');
              }
            })
            .catch(() => {
              send('ERROR');
            });
        }
      }
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    send({ type: 'SUBMIT', data: formData });
  };

  const logo = LOGO.map((_, i) => LOGO[(i + passwordLength) % LOGO.length]);

  return (
    <div className={css.root}>
      <div className={css.logo}>
        {logo.map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>
      <div className={css.container}>
        <div className={css.box}>
          <div>
            <h1 className={cn('text-sm', 'text-secondary')}>
              Password required
            </h1>
            <div className={cn('text-sm', 'text-primary')}>
              Please enter your password to get access.
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div
              aria-hidden={state.value !== 'error' || undefined}
              className={cn(css.errorBox, 'text-xs')}>
              The entered password is invalid. If you forgot your password
              reach out to us at <a href="mailto: i@designsystems.international">i@designsystems.international</a>.
            </div>

            <input
              ref={ref}
              aria-busy={state.value === 'submitting' || undefined}
              name="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordLength(e.target.value.length)}
            />
            <button
              aria-busy={state.value === 'submitting' || undefined}
              type="submit"
            >
              {state.value === 'submitting' ? 'Loading...' : 'Authenticate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
