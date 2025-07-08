pipeline {
    agent any
    
    // tools {
    //     nodejs 'NodeJS'
    // }
    
    // environment {
    //     DOCKER_IMAGE = "cyborden/tc-wms"
    //     BUILD_TAG = "v1.0.${BUILD_NUMBER}"
    // }

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
        
        stage("Docker Push") {
            steps {
               script {
                   sh "echo TEST"
               }
            }
        }
    }
}
