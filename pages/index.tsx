import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import startsWithVowel from '../helpers/startsWithVowel'
import styles from '../styles/Home.module.css'
import quizData from './quizData.json'
import { FacebookShareButton, LinkedinShareButton } from 'react-share';
import FacebookIcon from 'react-share/lib/FacebookIcon'
import LinkedinIcon from 'react-share/lib/LinkedinIcon'
import EmailShareButton from 'react-share/lib/EmailShareButton'
import EmailIcon from 'react-share/lib/EmailIcon'

function shuffleArray(array: any[]) {
  let curId = array.length;
  // There remain elements to shuffle
  while (0 !== curId) {
    // Pick a remaining element
    let randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    let tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
}


const share = {
  config: [{
    facebook: {
      socialShareUrl: ''
    }
  }, {
    twitter: {
      socialShareUrl: ''
    }
  }]
};

const Home: NextPage = () => {

  const [score, setScore] = useState<number[]>([0, 0, 0, 0]);
  const [stage, setStage] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState<number>(-1);
  const [outcome, setOutcome] = useState<number>(0);

  const startQuiz = () => {
    setStage('questions');
    setCurrentQuestion(0);
  }

  const upScore = (index: number, event: any) => {
    const t = event.currentTarget;
    t.classList.toggle(styles.selected);
    setTimeout(function () {
      // Show selection
      let scoreCopy = [...score];
      scoreCopy[index] = scoreCopy[index] + 1;
      setScore(scoreCopy);
      if (currentQuestion < quizData.questions.length - 1) {
        t.classList.toggle(styles.selected);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        getResults();
      }
    }, 600);
  }

  const getResults = () => {
    let highScore = 0;
    let selectedAnwser = -1;
    score.forEach((s, i) => {
      if (s > highScore) {
        highScore = s;
        selectedAnwser = i;
      } else if (s === highScore) {
        // Equals
        // Fuck it, just take the first match
      }
    });
    setOutcome(selectedAnwser);
    setStage('results');
  }

  const title = `Quiz: ${quizData.title.toString()}`;
  const description = `${quizData.description}`;
  const url = "https://which-hackaton-participant-are-you.vercel.app";
  const img = url + "/images/banner.webp";

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />


        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={img} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={img} />


      </Head>
      {
        stage !== 'intro' ?
          <header>
            <div><b>Quiz</b>: <em>{quizData.title}</em> &rarr; {
              stage === 'questions' ?
                <span>Question {currentQuestion + 1}/{quizData.questions.length}</span>
                :
                <span>Results</span>
            }</div>
          </header>
          :
          <></>
      }
      <main className={styles.main}>
        {
          stage === 'intro' ? (
            <>
              <h1 className={styles.title}>
                {quizData.title}
              </h1>
              <p className={styles.description}>
                {quizData.description}
              </p>
              {currentQuestion < 0 && (
                <button
                  onClick={startQuiz}
                  className={styles.card}
                  style={{ maxWidth: '200px', fontSize: '1.5rem', textAlign: 'center' }}>Get started &rarr;</button>
              )}
            </>
          ) : <></>
        }

        {stage !== 'results' ? (
          <div className={styles.questionWrapper}>
            {
              currentQuestion >= 0 && (
                <h2>{currentQuestion + 1}. {quizData.questions[currentQuestion].title}</h2>
              )
            }
            <div className={`${styles.grid}`}>

              {currentQuestion >= 0 && shuffleArray(quizData.questions[currentQuestion].answers).map((a, i) => (
                <button
                  key={i}
                  onClick={(e: any) => upScore(a.answerIndex, e)}
                  className={`${styles.card}`}
                >
                  <p>{a.answer}</p>
                </button>
              ))}
            </div>
          </div>
        )
          :
          (
            <div className={styles.result}>
              <span style={{ fontSize: '98px', display: 'block', margin: '0 auto', width: '40%' }}>{quizData.results[outcome].emoji}</span>
              <h1>You are <em>{quizData.results[outcome].title}</em></h1>
              <span>
                {quizData.results[outcome].description}
              </span>
              <div className={styles.shareBlock}>
                <h3>Share your result</h3>
                <div>
                  <LinkedinShareButton
                    url={`${url}/result/${quizData.results[outcome].title}`}
                  >
                    <LinkedinIcon size={32} round={true} />
                  </LinkedinShareButton>
                  <FacebookShareButton
                    url={`${url}/result/${quizData.results[outcome].title}`}
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <EmailShareButton 
                    url={`${url}/result/${quizData.results[outcome].title}`}
                    subject={`Which hackaton participant are you? I am a ${quizData.results[outcome].title}`}
                    body={`I did this test "Which hackaton participant are you?" and apparently I am a ${quizData.results[outcome].title}. You can find out too!`}
                  >
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                </div>
              </div>
              <p>
              Academics for Technology is super excited to be organizing Belgium’s most epic hackathon this year. Are you interested to innovate, co-create and learn? Then our hackathon is something for you! It will take place in OHL on 10th-11th March 2023!<br /><br />
                <a href='https://www.aftleuven.be/holy-hack/' className={styles.card} style={{ display: 'block', maxWidth: '295px' }}>Register for AFT Holy Hack &rarr;</a>
              </p>
            </div>
          )}

      </main>

      <footer className={styles.footer}>
        <a
          href='https://www.aftleuven.be'
          target="_blank"
          rel="noopener noreferrer"
        >
          Quiz by{' '}
          <span className={styles.logo}>
            <Image src="/aft.svg" alt="AFT Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
