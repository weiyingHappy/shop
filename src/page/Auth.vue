<template>
  <div>
    跳转中
  </div>
</template>

<script>
import config from '../common/config'
export default {
  created () {
    const { token, teamId, roomNum } = this.$route.query
    localStorage.token = token
    localStorage.teamId = teamId
    if (localStorage.roomNum) {
      localStorage.removeItem('roomNum')
    }
    if (roomNum !== undefined) {
      localStorage.roomNum = roomNum
    }
    this.$router.replace(`${config.rout}/home`)
  }
}
</script>

<style lang="scss" scoped>

</style>
