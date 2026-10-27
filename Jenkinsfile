```groovy
pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SCOPE',
            choices: ['ALL', 'CUSTOM'],
            description: 'Select ALL to run every test or CUSTOM to run one selected spec'
        )

        choice(
            name: 'SPEC_FILE',
            choices: [
                'tests/playw0.spec.js',
                'tests/playw1.spec.js',
                'tests/parallel.spec.js',
                'tests/apie2e.spec.js',
                'tests/api.spec.js'
            ],
            description: 'CUSTOM: Select the single spec file to run. Ignored for ALL.'
        )
    }

    environment {
        PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }

    stages {
        stage('Environment Check') {
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Select Test Files') {
            steps {
                script {
                    def uiSpecs = [
                        'tests/playw0.spec.js',
                        'tests/playw1.spec.js',
                        'tests/parallel.spec.js'
                    ]

                    def apiSpecs = [
                        'tests/apie2e.spec.js',
                        'tests/api.spec.js'
                    ]

                    def allSpecs = uiSpecs + apiSpecs

                    if (params.TEST_SCOPE == 'ALL') {
                        env.SELECTED_SPECS = allSpecs.join(',')
                    } else {
                        if (!(params.SPEC_FILE in allSpecs)) {
                            error "Invalid spec file: ${params.SPEC_FILE}"
                        }

                        env.SELECTED_SPECS = params.SPEC_FILE
                    }

                    echo "Execution mode: ${params.TEST_SCOPE}"
                    echo "Selected specs: ${env.SELECTED_SPECS}"
                }
            }
        }

        stage('Install Playwright Browser') {
            when {
                expression {
                    def selectedSpecs = env.SELECTED_SPECS
                        .split(',')
                        .collect { it.trim() }

                    return selectedSpecs.any {
                        it in [
                            'tests/playw0.spec.js',
                            'tests/playw1.spec.js',
                            'tests/parallel.spec.js'
                        ]
                    }
                }
            }
            steps {
                sh 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def uiSpecs = [
                        'tests/playw0.spec.js',
                        'tests/playw1.spec.js',
                        'tests/parallel.spec.js'
                    ]

                    def apiSpecs = [
                        'tests/apie2e.spec.js',
                        'tests/api.spec.js'
                    ]

                    def selectedSpecs = env.SELECTED_SPECS
                        .split(',')
                        .collect { it.trim() }

                    def selectedUiSpecs = selectedSpecs.findAll {
                        it in uiSpecs
                    }

                    def selectedApiSpecs = selectedSpecs.findAll {
                        it in apiSpecs
                    }

                    if (selectedUiSpecs) {
                        echo 'Running UI tests against UAT'

                        def uiArgs = selectedUiSpecs.collect {
                            "'${it}'"
                        }.join(' ')

                        sh "npx cross-env TEST_ENV=uat playwright test ${uiArgs}"
                    }

                    if (selectedApiSpecs) {
                        echo 'Running API tests'

                        def apiArgs = selectedApiSpecs.collect {
                            "'${it}'"
                        }.join(' ')

                        sh "npx playwright test ${apiArgs}"
                    }
                }
            }
        }
    }

    post {
        always {
            sh 'npm run allure:generate || true'

            archiveArtifacts(
                artifacts: 'playwright-report/**, allure-report/**, test-results/**',
                allowEmptyArchive: true
            )
        }
    }
}



// pipeline {
//     agent any

//     parameters {
//         choice(
//             name: 'SPEC_FILE',
//             choices: [
//                 'tests/playw0.spec.js',
//                 'tests/playw1.spec.js',
//                 'tests/parallel.spec.js',
//                 'tests/apie2e.spec.js',
//                 'tests/api.spec.js'
//             ],
//             description: 'Select the Playwright spec file to execute'
//         )
//     }

//     environment {
//         PATH = "/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
//     }

//     stages {

//         stage('Environment Check') {
//             steps {
//                 sh 'node -v'
//                 sh 'npm -v'
//                 sh 'git --version'
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 sh 'npm ci'
//             }
//         }

//         stage('Install Playwright Browser') {
           
//         when {
//            expression {
//                  return !(params.SPEC_FILE in [
//               'tests/api.spec.js',
//             'tests/apie2e.spec.js'
//               ])
//              }
// }

//             steps {
//                 sh 'npx playwright install chromium'
//             }
//         }

//         stage('Run Playwright Tests') {
//             steps {
//                 script {
//                     if (params.SPEC_FILE in ['tests/api.spec.js', 'tests/apie2e.spec.js']) {
//                         echo 'Running API tests without the UAT UI environment'
//                         sh 'npx playwright test "${SPEC_FILE}"'
//                     } else {
//                         echo 'Running UI tests against the configured UAT environment'
//                         sh 'npx cross-env TEST_ENV=uat playwright test "${SPEC_FILE}"'
//                     }
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             sh 'npm run allure:generate || true'

//             archiveArtifacts(
//                 artifacts: 'playwright-report/**, allure-report/**, test-results/**',
//                 allowEmptyArchive: true
//             )
//         }
//     }
// }
