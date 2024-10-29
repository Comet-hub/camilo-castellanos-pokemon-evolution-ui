import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-evolutions-ui.css.js';

import '@bbva-web-components/bbva-core-heading/bbva-core-heading.js';
import { bbvaAdvance } from '@bbva-web-components/bbva-foundations-icons';
import '@bbva-web-components/bbva-core-icon/bbva-core-icon.js';
import '@pokedex/pokemon-evolution-dm/pokemon-evolution-dm.js';

const advanceIcon = bbvaAdvance();

export class PokemonEvolutionsUi extends LitElement {
  static get properties() {
    return {
      pokemon: {
        type: Object,
      },
      arrowIcon: {
        type: String,
        attribute: false,
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
    this.pokemon = {};
  }

  async firstUpdated() {
    this.pokemonEvolutionDm = this.shadowRoot.querySelector(
      'pokemon-evolution-dm',
    );
    this.pokemonChain = await this.pokemonEvolutionDm.searchForEvolutions(
      this.pokemon.evolution.chain,
    );
  }

  async updated(changedProperties) {
    if (changedProperties.has('pokemon')) {
      this.pokemonChain = await this.pokemonEvolutionDm.searchForEvolutions(
        this.pokemon.evolution.chain,
      );
    }
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-evolutions-ui-shared-styles'),
    ];
  }

  render() {
    return html`
      <bbva-core-heading level="1"
        ><slot name="main-title"></slot> ${this.pokemon.name}</bbva-core-heading
      >
      <div class="container">
        <img
          src="${this.pokemon.sprites.other.home.front_default}"
          alt="${this.pokemon.name}"
          height="200"
          width="200"
        />
        <div class="evolution-tree">
          <bbva-core-heading level="4"
            ><slot name="chain-title"></slot
          ></bbva-core-heading>
          <div class="evolutions-container">
            <div class="column">
              <span class="row">
                <figure>
                  <img
                    src="${this.pokemonChain.sprites?.other.home.front_default}"
                    alt="${this.pokemonChain.name}"
                    width="64"
                    height="64"
                  />
                  <figcaption>
                    ${this.pokemonChain.name?.toUpperCase()}
                  </figcaption>
                </figure>
              </span>
            </div>
            <div class="column">
              ${this.pokemonChain.evolves_to?.map(
                (firstFase) =>
                  html`<div class="evolutions-container">
                    <div class="column">
                      <span class="row">
                        <bbva-core-icon
                          class="arrow"
                          icon="${this.arrowIcon}"
                        ></bbva-core-icon>
                        <figure>
                          <img
                            src="${firstFase.sprites.other.home.front_default}"
                            alt="${firstFase.name}"
                            width="64"
                            height="64"
                          />
                          <figcaption>
                            ${firstFase.name.toUpperCase()}
                          </figcaption>
                        </figure>
                      </span>
                    </div>
                    <div class="column">
                      ${firstFase.evolves_to.length
                        ? firstFase.evolves_to.map(
                            (secondFase) =>
                              html`<div class="evolution-container">
                                <div class="column">
                                  <span class="row">
                                    <bbva-core-icon
                                      class="arrow"
                                      icon="${this.arrowIcon}"
                                    ></bbva-core-icon>
                                    <figure>
                                      <img
                                        src="${secondFase.sprites.other.home
                                          .front_default}"
                                        alt="${secondFase.name}"
                                        width="64"
                                        height="64"
                                      />
                                      <figcaption>
                                        ${secondFase.name.toUpperCase()}
                                      </figcaption>
                                    </figure>
                                  </span>
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
}
