#!/bin/bash

# Function to run unit tests
run_unit_tests() {
    echo "🧪 Running Unit Tests"
    echo "=============================="
    npx vitest run
}

# Function to run unit tests with coverage
run_unit_tests_coverage() {
    echo "📊 Running Unit Tests with Coverage"
    echo "=============================="
    npx vitest run --coverage
}

# Function to run e2e tests
run_e2e_tests() {
    echo "🔄 Running E2E Tests"
    echo "=============================="
    npx cypress run
}

# Function to run e2e tests in interactive mode
run_e2e_tests_interactive() {
    echo "🖥️  Running E2E Tests (Interactive)"
    echo "=============================="
    npx cypress open
}

# Parse command line arguments
case "$1" in
    "unit")
        run_unit_tests
        ;;
    "unit:coverage")
        run_unit_tests_coverage
        ;;
    "e2e")
        run_e2e_tests
        ;;
    "e2e:open")
        run_e2e_tests_interactive
        ;;
    "all")
        run_unit_tests
        run_e2e_tests
        ;;
    *)
        echo "❌ Invalid test type specified"
        echo "Usage: $0 {unit|unit:coverage|e2e|e2e:open|all}"
        exit 1
        ;;
esac
