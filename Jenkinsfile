
pipeline {
    agent any

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

                    def testScope = params.TEST_SCOPE?.trim()
                    def rawSpec = params.SPEC_FILE?.trim()
                    def selectedSpec = rawSpec?.replaceAll(/,+$/, '')

                    if (testScope == 'ALL') {
                        env.SELECTED_SPECS = allSpecs.join(',')
                    } else if (testScope == 'CUSTOM') {
                        if (!selectedSpec || !(selectedSpec in allSpecs)) {
                            error "Invalid SPEC_FILE value: '${rawSpec}'. Check the Active Choices parameter configuration."
                        }

                        env.SELECTED_SPECS = selectedSpec
                    } else {
                        error "Invalid TEST_SCOPE value: '${testScope}'. Expected ALL or CUSTOM."
                    }

                    echo "Execution mode: ${testScope}"
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

        allure([
            results: [[path: 'allure-results']],
            reportBuildPolicy: 'ALWAYS',
            resultPolicy: 'LEAVE_AS_IS'
        ])

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
