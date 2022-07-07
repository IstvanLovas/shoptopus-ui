export $(egrep -v '^#' .env | xargs) # Export the vars in .env into your shell

for arg in "$@"; do
    case $arg in
    -ui)
        if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
            docker container exec -it shoptopus_client_1_ui bash
        else
            winpty docker container exec -it shoptopus_client_1_ui bash
        fi
        ;;
    -build)
        if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
            docker-compose build --no-cache ui
            docker-compose up -d
            docker container exec -it shoptopus_client_1_ui bash -c "npm install && npx mix --production"
        else
            docker-compose build --no-cache ui
            docker-compose up -d
            winpty docker container exec -it shoptopus_client_1_ui bash -c "npm install && npx mix --production"
        fi
        ;;
    -run)
        if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
            docker-compose up -d
        else
            docker-compose up -d
        fi
        ;;
    esac
done
