pipeline {
    agent any
    
    // tools {
    //     nodejs 'NodeJS'
    // }
    
    environment {
        REMOTE_SERVER = 'ubuntu@192.168.100.67'  // Change this to your server
        REMOTE_PATH = '/home/ubuntu/tc-wms'   // Change this to your repository path
    }

    stages {
        stage("Project Building") {
            steps {
                // git branch: 'main', url: 'https://github.com/denmgarcia/tc-wms'
                sh 'echo Hello'
            }
        }
        
        stage("Docker Building") {
            steps {
                echo "Building Docker image with tag: "
                // sh "docker build -t ${DOCKER_IMAGE}:${BUILD_TAG} ."
                // sh "docker tag ${DOCKER_IMAGE}:${BUILD_TAG} ${DOCKER_IMAGE}:latest"
            }
        }
        
        stage("Git pulling") {
            steps {
               script {
                     git branch: 'main', url: 'https://github.com/denmgarcia/tc-wms.git'

                sh """
                  
                   git config --global --add safe.directory /home/ubuntu/tc-wms
                   cd ${REMOTE_PATH}
                   git pull origin main
                """
               }
            }
        }
    }
}
