#!/bin/bash
docker-compose -f docker-compose.test.api.yml build && docker-compose -f docker-compose.test.api.yml run --rm test-api 
