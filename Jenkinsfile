pipeline {

    agent any

    stages {

        stage('Clone/Fetch Repo') {
            steps {
                echo "Checking to see if Repo exists! If it does then Fetch, if not then Clone"
		sh 'bash checkgit.sh'
            }
        }

        stage('Test') {
            steps {
                echo "Testing would normally be done here"
                //
            }
        }

        stage('Build Jar') {
            steps {
                echo "Jar file is built here"
		sh 'mvn clean package'
            }
        }

        stage('Move Jar') {
            steps {
                echo "Moving file outside of directory with build name"
                //
            }
        }

        stage('Stop Services') {
            steps {
                echo "Check to see if service is running and stops it"
                //
            }
        }

        stage('New Service') {
            steps {
                echo "Create new service"
                //
            }
        }

        stage('Reload & Start') {
            steps {
                echo "The jar file runs here"
		// sh 'java -jar target/Garage-0.0.1-SNAPSHOT.jar &'
            }

        }

    }

}
