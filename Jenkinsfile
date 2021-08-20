pipeline {

    agent any

    stages {

        stage('Clone/Fetch Repo') {
            steps {
                echo "Checking to see if Repo exists! If it does then Fetch, if not then Clone"
		sh 'bash checkgit.sh'
            }
        }

        stage('Test Application') {
            steps {
                echo "Testing Application"
                sh 'mvn clean test'
            }
        }

        stage('Saving Tests') {
            steps {
                echo "Creating directory Build Number_tests and moving reports there"
                sh 'mkdir -p /home/jenkins/Tests/${BUILD_NUMBER}_tests/'
                sh 'mv ./target/surefire-reports/*.txt /home/jenkins/Tests/${BUILD_NUMBER}_tests/'
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
                sh 'mkdir -p /home/jenkins/Jars'
                sh 'mkdir -p /home/jenkins/appservice'
                sh 'mv ./target/*.jar /home/jenkins/Jars/project_jar.jar'
            }
        }

        stage('Stopping Service') {
            steps {
                echo "Check to see if service is running and stops it"
                sh 'bash stopservice.sh'
            }
        }

        stage('Create new service file'){
                        steps{
                        sh ''' echo '#!/bin/bash
sudo java -jar /home/jenkins/Jars/project_jar.jar' > /home/jenkins/appservice/start.sh
sudo chmod +x /home/jenkins/appservice/start.sh'''
                        sh '''echo '[Unit]
Description=My SpringBoot App

[Service]
User=ubuntu
Type=simple

ExecStart=/home/jenkins/appservice/start.sh

[Install]
WantedBy=multi-user.target' > /home/jenkins/myApp.service'''
                        sh'sudo mv /home/jenkins/myApp.service /etc/systemd/system/myApp.service'
                        }
                }
                stage('Reload and restart service'){
                        steps{
                        sh 'sudo systemctl daemon-reload'
                        sh 'sudo systemctl restart myApp.service'
                        }
                }

        }
}


