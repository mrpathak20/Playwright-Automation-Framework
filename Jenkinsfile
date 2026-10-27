

pipeline {
    agent any

    parameters {
        choice(
            name: 'TEST_SCOPE',
            choices: [
                'ALL',
                'UI_ONLY',
                'API_ONLY',
                'CUSTOM'
            ],
            description: 'Choose which category of Playwright tests to execute'
        )

        extendedChoice(
            name: 'SPEC_FILES',
            type: 'PT_CHECKBOX',
            multiSelectDelimiter: ',',
            value: 'tests/playw0.spec.js,tests/playw1.spec.js,tests/parallel.spec.js,tests/apie2e.spec.js,tests/api.spec.js',
            defaultValue: 'tests/playw0.spec.js',
            description: 'Select one or more spec files when TEST_SCOPE is CUSTOM'
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

        stage('Install Playwright Browser') {
            when {
                expression {
                    return params.TEST_SCOPE != 'API_ONLY' &&
                        (
                            params.TEST_SCOPE != 'CUSTOM' ||
                            params.SPEC_FILES.split(',').any {
                                it.trim() in [
                                    'tests/playw0.spec.js',
                                    'tests/playw1.spec.js',
                                    'tests/parallel.spec.js'
                                ]
                            }
                        )
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

                    def selectedSpecs = []

                    switch (params.TEST_SCOPE) {
                        case 'ALL':
                            selectedSpecs = uiSpecs + apiSpecs
                            break

                        case 'UI_ONLY':
                            selectedSpecs = uiSpecs
                            break

                        case 'API_ONLY':
                            selectedSpecs = apiSpecs
                            break

                        case 'CUSTOM':
                            selectedSpecs = params.SPEC_FILES
                                .split(',')
                                .collect { it.trim() }
                                .findAll { it }
                            break
                    }

                    if (!selectedSpecs) {
                        error 'No spec files selected.'
                    }

                    def invalidSpecs = selectedSpecs.findAll {
                        !(it in uiSpecs + apiSpecs)
                    }

                    if (invalidSpecs) {
                        error "Invalid spec file selection: ${invalidSpecs}"
                    }

                    def selectedUiSpecs = selectedSpecs.findAll {
                        it in uiSpecs
                    }

                    def selectedApiSpecs = selectedSpecs.findAll {
                        it in apiSpecs
                    }

                    echo "Selected spec files: ${selectedSpecs.join(', ')}"

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
