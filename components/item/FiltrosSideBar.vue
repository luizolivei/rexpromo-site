<template>
  <div class="form-container">
    <form @submit="onSubmitForm">
      <div class="form-group">
        <select
          v-model="filters.orderByValue"
          class="form-control filters"
          name="orderbyprice"
          id="orderBy"
        >
          <option style="color: #0000ff" value="" disabled>Ordenar por preço</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>

      <div class="form-group">
        <select
          v-model="filters.orderByDate"
          class="form-control filters"
          name="orderbydate"
          id="orderByDate"
        >
          <option style="color: #0000ff" value="" disabled>Ordenar por data</option>
          <option value="asc">Mais recente</option>
          <option value="desc">Mais antigo</option>
        </select>
      </div>
      <div class="form-group">
        <select
          class="form-control filters"
          v-model="filters.filterByValue"
          name="diferencial"
          id="filterBy"
        >
          <option style="color: #0000ff" value="" disabled>Filtrar por diferenciais</option>
          <option v-for="(diferencial, i) in diferenciais" :key="i" :value="diferencial._id">
            <text>{{ diferencial.nome }}</text>
          </option>
        </select>
      </div>

      <div class="mt-1 p-2">
        <p>Faixa de preço:</p>
        <div class="d-flex justify-content-center align-items-center">
          <input
            class="price-range"
            v-model="filters.min"
            :max="priceMaxForMin"
            type="number"
            name="pricerangemin"
            aria-label="Preço Mínimo"
            placeholder="Mínimo"
          />
          <span class="text-muted">-</span>
          <input
            class="price-range"
            v-model="filters.max"
            :min="priceMinForMax"
            type="number"
            name="pricerangemax"
            aria-label="Preço Máximo"
            placeholder="Máximo"
          />
        </div>
      </div>

      <div class="text-center pt-2">
        <div>
          <button
            type="submit"
            :disabled="hasDisabled"
            class="btn btn-secondary btn-lg btn-block btn-filters py-2"
          >
            Aplicar filtros
          </button>
        </div>
        <div>
          <button
            type="reset"
            @click="cleanFilters"
            class="btn btn-lg btn-block btn-clean-filter"
          >
            Limpar filtros
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "FiltrosSideBar",
  components: {Option},
  props: {
    diferenciais: Object
  },
  data() {
    return {
      openModal: false,
      loading: false,
      hasDisabled: false,
      priceMin: 0,
      priceMax: 9999,
      filters: {
        nome: "",
        min: "",
        max: "",
        groupByValue: "",
        filterByValue: "",
        orderByValue: "",
        orderByDate: "",
      },
    };
  },
  created() {
    this.$store.dispatch("filters/getFiltersFromStorage");

    if (this.GetFilters) this.filters = this.GetFilters;
  },
  methods: {
    onSubmitForm() {
      this.loading = !this.loading;
      this.hasDisabled = !this.hasDisabled;
      this.$store.dispatch("filters/setFilters", this.filters);
    },
    cleanFilters() {
      window.location.href = window.location.pathname;
      this.$store.dispatch("filters/cleanFilters");
      localStorage.removeItem("filters");
      localStorage.nome = "";
    },
  },
  computed: {
    priceMaxForMin: function () {
      return this.priceMax;
    },
    priceMinForMax: function () {
      return this.priceMin;
    },

    ...mapGetters("filters", ["GetFilters"]),
  },
};
</script>

<style scoped>
.form-container {
  position: relative;
  background: white
}

label {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #414042;
}

option[value=""][disabled] {
  display: none;
}

select:disabled {
  color: #0000ff;
}

.btn-clean-filter {
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  text-decoration-line: underline;
  color: #414042;
}

select::selection {
  color: #fff;
  background: #dda0dd;
  text-shadow: 1px 1px 2px #b040b0;
}

.btn-filters {
  background: transparent;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: rgb(65 64 66);
}

select.filters {
  border: none;
  border-bottom: 1px solid #c9c9c9;
  border-radius: 0;
  background: transparent;
  text-align-last: left;
}

.form-group::after {
  position: absolute;
  right: 15px;
  font-size: 25px;
  font-family: "guia-icons";
  content: "\F0140";
  color: black;
}

.form-group {
  display: flex;
  margin-bottom: 10px;
}

.price-range {
  width: 35%;
  margin-inline: 5px;
}
</style>
