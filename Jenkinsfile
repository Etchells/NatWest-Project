pipeline {
    agent any
    stages {
        stage('Clone/Fetch Repo') {
            steps {
                echo "Checking for Repo"
		// sh 'git fetch https://github.com/Etchells/NatWest-Project.git'
		sh 'bash checkgit.sh'
            }
        }
        stage('Build Jar') {
            steps {
                echo "Jar file is built here"
		sh 'mvn clean package'
            }
        }
        stage('Run Jar') {
            steps {
                echo "The jar file runs here"
		// sh 'java -jar target/Garage-0.0.1-SNAPSHOT.jar &'
            }
        }
    }
}
