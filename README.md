# Oxidation State App
A web based app for identifying the likelihoods of oxidation states coexisting in materials and applying this knowledge.

## This repo uses submodules

This repo uses a submodule for the [original java code](https://github.com/TRI-AMDD/oxidationStates). 

See this [submodule guide](https://git-scm.com/book/en/v2/Git-Tools-Submodules) for working with submodules.

### Clone

- clone from scratch
    ```bash
    git clone --recurse-submodules git@github.com:TRI-AMDD/oxidation-state-app.git
    ```
- or if you already cloned without submodules
    ```bash
    git clone git@github.com:TRI-AMDD/oxidation-state-app.git
    submodule update --init --recursive
    ```

### Git pull with submodules

`git pull` by itself doesn't take in submodule updates. Need an additional command.

```bash
git pull
git submodule update --init --recursive
```
  
### Update the submodule

To make sure this repo uses the latest code from the submodule repo:

```bash
git submodule update --remote
```

Then commit and push the changes.


## Local Run for Debugging




Run the UI in a separate terminal

```bash
cd ui
npm install  # if needed
npm start
```

Browser will automatically load the app at <http://localhost:3000/>
Learn more about [UI](ui/README.md)

