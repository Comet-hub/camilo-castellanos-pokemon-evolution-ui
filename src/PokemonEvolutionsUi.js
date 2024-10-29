import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-evolutions-ui.css.js';

import '@bbva-web-components/bbva-core-heading/bbva-core-heading.js';
import { bbvaAdvance } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaBackmini } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-core-icon/bbva-core-icon.js';
import '@bbva-web-components/bbva-web-link';
import '@pokedex/pokemon-evolution-dm/pokemon-evolution-dm.js';

const applin = {
  id: 840,
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/840.png',
  name: 'Applin',
  evolutionChain: 'https://pokeapi.co/api/v2/evolution-chain/442/',
};

const jolteon = {
  id: 135,
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/135.png',
  name: 'Jolteon',
  evolutionChain: 'https://pokeapi.co/api/v2/evolution-chain/67/',
};

const oddish = {
  id: 43,
  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/43.png',
  name: 'oddish',
  evolutionChain: 'https://pokeapi.co/api/v2/evolution-chain/18/',
};

const advanceIcon = bbvaAdvance();
const backMiniIcon = bbvaBackmini();

export class PokemonEvolutionsUi extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      pokemon: {
        type: Object,
      },
      arrowIcon: {
        type: String,
      },
      backIcon: {
        type: String,
      },
      chain: {
        type: Object,
      },
      pokemonChain: {
        type: Object,
      },
    };
  }

  constructor() {
    super();
    this.pokemonChain = {};
    this.arrowIcon = advanceIcon;
    this.backIcon = backMiniIcon;
    this.pokemon = oddish;
    this.searchEvolutions();
  }

  async firstUpdated() {
    this.pokemonEvolutionDm = this.shadowRoot.querySelector(
      'pokemon-evolution-dm',
    );
    this.pokemonChain = await this.pokemonEvolutionDm.searchForEvolutions(
      this.chain.chain,
    );
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-evolutions-ui-shared-styles'),
    ];
  }

  render() {
    return html`
      <bbva-web-link @click=${(e) => console.log('home-page')}>
        <bbva-core-icon icon="${this.backIcon}"></bbva-core-icon>
        BACK
      </bbva-web-link>
      <bbva-core-heading level="1"
        >Evolutions of ${this.pokemon.name}</bbva-core-heading
      >
      <div class="container">
        <img
          src="${this.pokemon.img}"
          alt="${this.pokemon.name}"
          height="200"
          width="200"
        />
        <div class="evolution-tree">
          <bbva-core-heading level="4">Evolution Chain</bbva-core-heading>
          <div class="evolutions-container">
            <div class="column">
              <p>${this.pokemonChain.name}</p>
            </div>
            <div class="column">
              ${this.chain.chain.evolves_to.map(
                (firstFase) =>
                  html`<div class="evolutions-container">
                    <div class="column">
                      <p>
                        <bbva-core-icon
                          class="arrow"
                          icon="${this.arrowIcon}"
                        ></bbva-core-icon>
                        ${firstFase.species.name.toUpperCase()}
                      </p>
                    </div>
                    <div class="column">
                      ${firstFase.evolves_to.length
                        ? firstFase.evolves_to.map(
                            (secondFase) =>
                              html`<div class="evolution-container">
                                <div class="column">
                                  <p>
                                    <bbva-core-icon
                                      class="arrow"
                                      icon="${this.arrowIcon}"
                                    ></bbva-core-icon>
                                    ${secondFase.species.name.toUpperCase()}
                                  </p>
                                </div>
                              </div>`,
                          )
                        : ''}
                    </div>
                  </div>`,
              )}
            </div>
          </div>
        </div>
      </div>
      <pokemon-evolution-dm></pokemon-evolution-dm>
    `;
  }

  searchEvolutions() {
    fetch(this.pokemon.evolutionChain)
      .then((res) => res.json())
      .then((data) => (this.chain = data));
  }
}
