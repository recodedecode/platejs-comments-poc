import Link from 'next/link'
import { css } from '@emotion/react'


export const HomeScreen = () => {
  return (
    <main css={styles.main}>
      <h1 css={styles.title}>
        Demo <span>Editor</span>
      </h1>

      <p css={styles.description}>
        Get started by selecting a demo
        <br />
        usecase from below.
      </p>

      <div css={styles.grid}>
        <Link href="/simple" passHref>
          <a css={styles.card}>
            <h2>Simple &rarr;</h2>
            <p>A simple example here.</p>
          </a>
        </Link>

        <Link href="/comments" passHref>
          <a css={styles.card}>
            <h2>Comments &rarr;</h2>
            <p>Comments example here.</p>
          </a>
        </Link>

      </div>
    </main>
  )
}

export default HomeScreen

const styles = {
  main: css`
    min-height: 100vh;
    padding: 4rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  title: css`
    margin: 0;
    line-height: 1.15;
    font-size: 4rem;
    ext-align: center;

    a {
      color: #0070f3;
      text-decoration: none;
    }
    a:hover,
    a:focus,
    a:active {
      text-decoration: underline;
    }
  `,
  description: css`
    margin: 4rem 0;
    line-height: 1.5;
    font-size: 1.5rem;
    text-align: center;
  `,
  grid: css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 800px;
  `,
  card: css`
    margin: 1rem;
    padding: 1.5rem;
    text-align: left;
    color: inherit;
    text-decoration: none;
    border: 1px solid #eaeaea;
    border-radius: 10px;
    transition: color 0.15s ease, border-color 0.15s ease;
    max-width: 300px;
  
    &:hover,
    &:focus,
    &:active {
      color: #0070f3;
      border-color: #0070f3;
    }
    
    > h2 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }
    
    > p {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.5;
    }

    @media (max-width: 600px) {
      width: 100%;
      flex-direction: column;
    }
  `
}
