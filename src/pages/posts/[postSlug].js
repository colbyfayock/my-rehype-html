import Head from 'next/head'
import Link from 'next/link'

import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import parameterize from 'parameterize';

import postsData from '../../../data/posts.json';

import styles from '../../styles/Home.module.css'

export default function Post({ post }) {
  const toc = [];

  const content = unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(() => {
      return (tree) => {
        visit(tree, 'element', function (node) {
          if ( node.tagName === 'h2' ) {
            const id = parameterize(node.children[0].value);
            node.properties.id = id;

            toc.push({
              id,
              title: node.children[0].value,
            });
          }
        });
        return;
      };
    })
    .use(rehypeStringify)
    .processSync(post.content)
    .toString();

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

        <ul>
          {toc.map(({ id, title}) => {
            return (
              <li key={id}>
                <a href={`#${id}`}>
                  { title }
                </a>
              </li>
            )
          })}
        </ul>

        <div className={styles.grid}>
          <div className={styles.content} dangerouslySetInnerHTML={{
            __html: content
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