import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BASE_URL, PRE_API, SUFFIX } from "../utils";
import { format } from "date-fns";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    `${BASE_URL}${SUFFIX}${PRE_API}${process.env.NASA_API_KEY}`
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
};
interface IData {
  data: {
    date: string;
    explanation: string;
    hdurl: string;
    media_type: string;
    service_version: string;
    title: string;
    url: string;
  };
}
const Home = ({ data }: IData) => {
  const formattedDate = format(new Date(data.date), "MMMM do, yyyy");
  return (
    <div className={styles.container}>
      <Head>
        <title>NASA | POTD</title>
        <meta name="description" content="NASA picture of the day" />
        <meta name="color-scheme" content="dark" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>{`NASA POTD - ${formattedDate}`}</p>
        <div>
          <h3 className={styles.title}>{data.title}</h3>
          <div className={styles.imageContainer}>
          <Image className={styles.image} src={data.url} height={750} width={750} />
          </div>
          <p className={styles.description}>{data.explanation}</p>
          <a href={data.url}> View on NASA</a>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright 2022</p>
      </footer>
    </div>
  );
};

export default Home;
