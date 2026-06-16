import 'dart:async';
import 'package:flutter/material.dart';

void main() {
  runApp(const QuizApp());
}

class QuizApp extends StatelessWidget {
  const QuizApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Quiz Interaktif',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const QuizPage(),
    );
  }
}

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});

  @override
  State<QuizPage> createState() => _QuizPageState();
}

class _QuizPageState extends State<QuizPage> {
  final List<Map<String, dynamic>> questions = [
    {
      'question': 'Bahasa pemrograman yang digunakan Flutter adalah?',
      'options': ['Java', 'Kotlin', 'Dart', 'Python'],
      'answer': 'Dart',
    },
    {
      'question': 'Widget yang tidak berubah menggunakan?',
      'options': [
        'StatefulWidget',
        'StatelessWidget',
        'Container',
        'Column'
      ],
      'answer': 'StatelessWidget',
    },
    {
      'question': 'Siapa pengembang Flutter?',
      'options': ['Apple', 'Microsoft', 'Google', 'Meta'],
      'answer': 'Google',
    },
    {
      'question': 'Fungsi setState() digunakan untuk?',
      'options': [
        'Menutup aplikasi',
        'Mengubah tampilan UI',
        'Menghapus data',
        'Menjalankan database'
      ],
      'answer': 'Mengubah tampilan UI',
    },
    {
      'question': 'Flutter dapat digunakan untuk membuat?',
      'options': [
        'Mobile App',
        'Web App',
        'Desktop App',
        'Semua Benar'
      ],
      'answer': 'Semua Benar',
    },
  ];

  int currentQuestion = 0;
  int score = 0;
  int timeLeft = 15;
  Timer? timer;

  @override
  void initState() {
    super.initState();
    startTimer();
  }

  void startTimer() {
    timer?.cancel();

    timeLeft = 15;

    timer = Timer.periodic(
      const Duration(seconds: 1),
          (timer) {
        if (timeLeft > 0) {
          setState(() {
            timeLeft--;
          });
        } else {
          nextQuestion();
        }
      },
    );
  }

  void checkAnswer(String selectedAnswer) {
    if (selectedAnswer ==
        questions[currentQuestion]['answer']) {
      score += 20;
    }

    nextQuestion();
  }

  void nextQuestion() {
    timer?.cancel();

    if (currentQuestion < questions.length - 1) {
      setState(() {
        currentQuestion++;
      });

      startTimer();
    } else {
      setState(() {
        currentQuestion++;
      });
    }
  }

  void restartQuiz() {
    timer?.cancel();

    setState(() {
      currentQuestion = 0;
      score = 0;
    });

    startTimer();
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    bool quizFinished =
        currentQuestion >= questions.length;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Quiz Interaktif"),
        centerTitle: true,
      ),
      body: quizFinished
          ? buildResult()
          : buildQuestion(),
    );
  }

  Widget buildQuestion() {
    var question = questions[currentQuestion];

    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Card(
            color: Colors.blue.shade100,
            child: Padding(
              padding: const EdgeInsets.all(15),
              child: Row(
                mainAxisAlignment:
                MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Soal ${currentQuestion + 1}/${questions.length}",
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  Text(
                    "⏳ $timeLeft",
                    style: const TextStyle(
                      fontSize: 18,
                      color: Colors.red,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),

          const SizedBox(height: 30),

          Text(
            question['question'],
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 30),

          ...question['options'].map<Widget>((option) {
            return Container(
              width: double.infinity,
              margin: const EdgeInsets.only(bottom: 15),
              child: ElevatedButton(
                onPressed: () {
                  checkAnswer(option);
                },
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.all(15),
                ),
                child: Text(
                  option,
                  style: const TextStyle(fontSize: 18),
                ),
              ),
            );
          }).toList(),
        ],
      ),
    );
  }

  Widget buildResult() {
    String grade;

    if (score >= 80) {
      grade = "Sangat Baik 🎉";
    } else if (score >= 60) {
      grade = "Baik 👍";
    } else {
      grade = "Perlu Belajar Lagi 📚";
    }

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Card(
          elevation: 8,
          child: Padding(
            padding: const EdgeInsets.all(25),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Icon(
                  Icons.emoji_events,
                  size: 100,
                  color: Colors.amber,
                ),

                const SizedBox(height: 20),

                const Text(
                  "Quiz Selesai!",
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 20),

                Text(
                  "Skor Anda: $score",
                  style: const TextStyle(
                    fontSize: 24,
                  ),
                ),

                const SizedBox(height: 10),

                Text(
                  grade,
                  style: const TextStyle(
                    fontSize: 22,
                    color: Colors.blue,
                  ),
                ),

                const SizedBox(height: 25),

                ElevatedButton.icon(
                  onPressed: restartQuiz,
                  icon: const Icon(Icons.refresh),
                  label: const Text("Main Lagi"),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}