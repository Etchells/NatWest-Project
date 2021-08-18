pipeline {
    agent any
    stages {
        stage('Clone Repo') {
            steps {
                echo "Clone Repo"
		sh 'git clone https://github.com/Etchells/NatWest-Project.git'
            }
        }
        stage('Build Jar') {
            steps {
                echo "Jar file is built here"
            }
        }
        stage('Run Jar') {
            steps {
                echo "The jar file runs here"
            }
        }
    }
}
