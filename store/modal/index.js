const state = () => ({
  data: [],
  show: false,
  loading: false,
});

const getters = {
  data: ({data}) => {
    return data;
  },

  show: ({show}) => {
    return show;
  },

  loading: ({loading}) => {
    return loading;
  },
};

const mutations = {
  updateData: (state, payload) => {
    state.data = payload;
  },

  updateShow: (state) => {
    state.show = !state.show;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
}
