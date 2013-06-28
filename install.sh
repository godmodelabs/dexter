#!/bin/bash

DEPTH=5

function findTarget {
    if [ -z "$2" ]; then
        local l=0
    else
        local l=$2
    fi

    if [ "$l" -eq "$DEPTH" ]; then
        echo "none"
    else
        local target=../$1
        if [ -d $target ]; then
            echo $target
        else
            echo $(findTarget $target $(($l + 1)))
        fi
    fi
}

function makeSymlink {
    if [ ! -d ./$2 ]; then

        local targetdepth
        for i in $(echo $2 | tr "/" "\n"); do
            if [ -z "$targetdepth" ]; then
                targetdepth="./"
            else
                targetdepth="../$targetdepth"
            fi
        done

        local target=$(findTarget $1)

        if [ "$target" = "none" ]; then
            echo "[Error] Required directory $1 not found, please fetch the repository"
            exit
        fi

        if ln -s $targetdepth$target ./$2; then
            echo "Successfully created $2 symlink"
        else
            echo "[Error] Failed to create $2 symlink"
            exit
        fi
    else
        echo "Found existing $2 symlink, nothing to do here, move along"
    fi
}

echo "[---------- Creating Symlinks --------->"
makeSymlink core/js js/core
makeSymlink internals/js js/internals
makeSymlink externals/js js/externals
