import Head from 'next/head'
import Link from 'next/link'

import postsData from '../../data/posts.json';

import styles from '../styles/Home.module.css'

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Space Jelly</title>
        <meta name="description" content="Cosmic web dev tutorials that will shock you with joy! at Space Jelly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Space Jelly</h1>

        <p className={styles.description}>Cosmic web dev tutorials that will shock you with joy! at Space Jelly</p>

        <ul className={styles.grid}>
          {posts && posts.length > 0 && posts.map(post => {
            return (
              <li key={post.slug} className={styles.card}>
                <Link href={post.path}>
                  <a>
                    <h3 dangerouslySetInnerHTML={{
                      __html: post.title
                    }} />
                    <div dangerouslySetInnerHTML={{
                      __html: post.excerpt
                    }} />
                  </a>
                </Link>
              </li>
            );
          })}

          {!posts || posts.length === 0 && (
            <li>
              <p>
                Oops, no posts found!
              </p>
            </li>
          )}
        </ul>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const posts = postsData.map(post => {
    return {
      ...post,
      path: `/posts/${post.slug}`
    }
  });

  return {
    props: {
      posts
    }
  }
}
