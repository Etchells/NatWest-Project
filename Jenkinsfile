pipeline {
    agent any
    stages {
        stage('Clone Repo') {
            steps {
                echo "Clone Repo Testing"
		sh 'git fetch https://github.com/Etchells/NatWest-Project.git'
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
		sh 'java -jar target/Garage-0.0.1-SNAPSHOT.jar &'
            }
        }
    }
}
