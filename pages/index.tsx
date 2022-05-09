import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { BASE_URL, PRE_API, SUFFIX } from "../utils";
import { format } from "date-fns";
import { BsGithub, BsTwitter, BsLinkedin } from "react-icons/bs";

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
      <div className={styles.repoLinkContainer}>
        <a
          className={styles.link}
          href="https://github.com/Slap-a-tha-Bass/nasa-potd"
          target="_blank"
          rel="noreferrer"
        >
          Repo Link
        </a>
      </div>
      <main className={styles.main}>
        <p>{`NASA POTD - ${formattedDate}`}</p>
        <div>
          <h3 className={styles.title}>{data.title}</h3>
          <div className={styles.imageContainer}>
            {data.url === "https://apod.nasa.gov/*" ? (
              <Image
                className={styles.image}
                src={data.url}
                alt={data.title}
                height={750}
                width={750}
              />
            ) : (
              <iframe
                className={styles.image}
                src={data.url}
                title={data.title}
                height={750}
                width={750}
              />
            )}
          </div>
          <p className={styles.description}>{data.explanation}</p>
          <div className={styles.linkContainer}>
            <a
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              href={data.url}
            >
              View on NASA
            </a>
            {data.url === "https://apod.nasa.gov/*" ? <a
              className={styles.link}
              target="_blank"
              rel="noreferrer"
              href={data.hdurl}
            >
              View in HD Resolution
            </a> : null}
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          className={styles.link}
          href="https://github.com/Slap-a-tha-Bass"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub size={24} />
        </a>
        <a
          className={styles.link}
          href="https://twitter.com/Slap_a_tha_Bass"
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter size={24} />
        </a>
        <a
          className={styles.link}
          href="https://linkedin.com/in/corey-deloach"
          target="_blank"
          rel="noreferrer"
        >
          <BsLinkedin size={24} />
        </a>
      </footer>
      <p className={styles.copyright}>Copyright © 2022</p>
    </div>
  );
};

export default Home;
