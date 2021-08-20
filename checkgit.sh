#! /bin/bash/

REPO=NatWest-Project


if [ ! -d "$REPO" ]; then
git clone https://github.com/Etchells/NatWest-Project
else
git fetch https://github.com/Etchells/NatWest-Project
fi
