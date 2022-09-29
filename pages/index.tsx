import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const quizData = {
  title: 'What type of founder are you?',
  description: 'Find out how you approach your startup.',
  questions: [
    {
      title: 'Your sugar aunt has to move this weekend, and she asks for your help. Although you already have other plans, you want to help her. What do you do?',
      answers: [
        {
          answer: 'I combine her stair elevator with an old chainsaw engine so that it supports heavy loads. Now all her belongings can be automatically carried upstairs!',
          answerIndex: 0
        },
        {
          answer: 'So what I have other plans? There are 24 hours in a day: I will find some time to help move!',
          answerIndex: 1
        },
        {
          answer: 'Unfortunately, I cannot help her move but I promise to install all the furniture next Monday.',
          answerIndex: 2
        }
        ,
        {
          answer: 'I show her a platform where she can find a student to do the job for a small fee.',
          answerIndex: 3
        }
      ]
    },
    {
      title: 'The Red Devils made it to the finals of the World Cup. Sadly, Thibaut Courtois got injured. Roberto Martinez asks you to replace him. What do you do?',
      answers: [
        {
          answer: 'I\'m in! This is the perfect time to test out my new hydraulic keeper gloves.',
          answerIndex: 0
        },
        {
          answer: 'Simon Mignolet might be better suited for the job, but he seems a bit down. I tell him this is his moment to shine, he can do it!',
          answerIndex: 1
        },
        {
          answer: 'The solution is simple: let\'s place a brick wall inside the goal: nobody can break my sturdy construction.',
          answerIndex: 2
        }
        ,
        {
          answer: 'I call Roberto Martinez back and tell him he shouldn\'t be asking this. Rather, he should devote his attention to the existing team, not to a random outsider.',
          answerIndex: 3
        }
      ]
    },
    {
      title: 'Which criminal do you most identify with? ',
      answers: [
        {
          answer: 'Elisabeth Holmes',
          answerIndex: 0
        },
        {
          answer: 'Charles Manson',
          answerIndex: 1
        },
        {
          answer: 'Jordan Belfort (from The Wolf of Wall Street',
          answerIndex: 2
        }
        ,
        {
          answer: ' I wouldn\'t be a criminal myself; I would inform criminals on how to become one',
          answerIndex: 3
        }
      ]
    },
    {
      title: 'Which car do you prefer? ',
      answers: [
        {
          answer: 'Solar One',
          answerIndex: 0
        },
        {
          answer: 'I don\'t mind. Any car, as long as I can use it daily',
          answerIndex: 1
        },
        {
          answer: 'A tuned golf',
          answerIndex: 2
        }
        ,
        {
          answer: 'A Mercedes-Benz',
          answerIndex: 3
        }
      ]
    },
    {
      title: 'What does your dream house look like?',
      answers: [
        {
          answer: 'A lush tree house with a generator powered by photosynthesis',
          answerIndex: 0
        },
        {
          answer: 'A mobilhome, so I can always be on the road.',
          answerIndex: 1
        },
        {
          answer: 'A giant villa that I built from the ground up with my bare hands. ',
          answerIndex: 2
        }
        ,
        {
          answer: ' A condo in Japanese hogyo style. I can show the architect how to approach this project.',
          answerIndex: 3
        }
      ]
    },
    {
      title: 'Last question: which of these companies would you prefer to work for?',
      answers: [
        {
          answer: 'Google',
          answerIndex: 0
        },
        {
          answer: 'I would rather become a self-employed mental coach',
          answerIndex: 1
        },
        {
          answer: 'A small custom software development studio',
          answerIndex: 2
        }
        ,
        {
          answer: 'McKinsey',
          answerIndex: 3
        }
      ]
    }
  ],
  results: [
    {
      title: 'inventor 💡',
      description: 'You seek disruption, to boldly pursue a new product or business model. Famous inventors are Steve Jobs, Brian Chesky and Thomas Edison.',
    },
    {
      title: 'driver 🚘',
      description: 'Your speciality is to get the best people on board, to motivate every person in your organization to pursue the mission. Famous drivers are Angela Merkel, Richard Branson and Martin Luther King Jr.'
    },
    {
      title: 'builder 🧱',
      description: 'You gotta love the hustle. If you have a goal, you will do everything you can do to turn your dream into a reality. Famous builders are Sara Blakely, Dr Dre and Elon Musk.'
    },
    {
      title: 'guide 🦮',
      description: 'In your opinion, working better doesn\'t necessarily mean working harder. Efficiency and knowledge are your tools to improve the process of your company.'
    }
  ]
};

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

function startsWithVowel(word: string){
  var vowels = ("aeiouAEIOU"); 
  return vowels.indexOf(word[0]) !== -1;
}


const Home: NextPage = () => {

  const [score, setScore] = useState<number[]>([0, 0, 0, 0]);
  const [stage, setStage] = useState<'intro' | 'questions' | 'results'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState<number>(-1);
  const [outcome, setOutcome] = useState<number>(0);

  const startQuiz = () => {
    setStage('questions');
    setCurrentQuestion(0);
  }

  const upScore = (index: number) => {
    let scoreCopy = [...score];
    scoreCopy[index] = scoreCopy[index] + 1;
    setScore(scoreCopy);
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      getResults();
    }
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Quiz: {quizData.title}</title>
        <meta name="description" content={quizData.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        stage !== 'intro' ?
      <header>
      <span>AFT Quiz: {quizData.title}</span>
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
                <button onClick={startQuiz}
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
                  onClick={() => upScore(a.answerIndex)}
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
              <span style={{fontSize: '58px'}}>🎉</span>
              <h1>You are a{startsWithVowel(quizData.results[outcome].title) ? 'n' : ''} <em>{quizData.results[outcome].title}</em></h1>
              <span>
                {quizData.results[outcome].description}
              </span>
              <p>
                Want to know more about the Belgian startup scene?<br/>
                <button className={styles.card} style={{maxWidth:'265px'}}>Join the AFT Belgium Startup Trip &rarr;</button>
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
