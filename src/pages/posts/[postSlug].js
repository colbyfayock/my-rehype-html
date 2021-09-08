import Head from 'next/head'
import Link from 'next/link'

import postsData from '../../../data/posts.json';

import styles from '../../styles/Home.module.css'

export default function Post({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{ post.title }</title>
        <meta name="description" content={`Read more about ${post.title} on Space Jelly`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          { post.title }
        </h1>

        <div className={styles.grid}>
          <div className={styles.content} dangerouslySetInnerHTML={{
            __html: post.content
          }} />
        </div>

        <p className={styles.backToHome}>
          <Link href="/">
            <a>
              &lt; Back to home
            </a>
          </Link>
        </p>
      </main>
    </div>
  )
}

export async function getStaticProps({ params = {} } = {}) {
  const { postSlug } = params;

  const post = postsData.find(post => post.slug === postSlug);

  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: postsData.map(({ slug }) => {
      return {
        params: {
          postSlug: slug
        }
      }
    }),
    fallback: false
  }
}