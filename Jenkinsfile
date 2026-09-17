pipeline {
    agent any

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Deploy Test') {
            steps {
                bat 'xcopy /E /I /Y /Q dist C:\\inetpub\\wwwroot\\earth-defense'
            }
        }
    }

    post {
        success {
            echo 'Jenkins Pipeline completed successfully!'
        }

        failure {
            echo 'Jenkins Pipeline failed.'
        }
    }
}