<template>
  <Page>
    <Row>
      <Column>
        <div v-if="auth" class="profile">
          <img :src="auth.user?.image || ''" />
          <p>{{ auth.user?.name }} &lt;{{ auth.user?.email }}&gt;</p>
        </div>
        <h1>{{ status }}</h1>
        <button v-if="status === 'unauthenticated'" @click="signIn()">Login</button>
        <button v-if="status === 'authenticated'" @click="signOut()">Logout</button>
        <h2>(loading) {{ pending }}</h2>
        <h2>(data) {{ data }}</h2>
        <button @click="refresh()">Refresh data</button>
      </Column>
    </Row>
    <Row>
      <Column width="300px" style="background-color: lightblue">
        <ContentList v-slot="{ list }" path="/data/example" :query="{ without: ['_', 'title'] }">
          <ul>
            <li v-for="item in list" :key="item._id">
              <pre>{{ JSON.stringify(item, null, 2) }}</pre>
            </li>
          </ul>
        </ContentList>
      </Column>
      <Column style="background-color: lightgreen">
        <pre>{{ JSON.stringify(message, null, 2) }}</pre>
      </Column>
    </Row>
  </Page>
</template>

<script setup lang="ts">
const { signIn, signOut, status, data: auth } = useSession()
const { data, pending, refresh } = useAuthenticatedFetch('/api/news', { server: false })

const message = await queryContent('/data/example').without(['_', 'title']).findOne()
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: arial;
}
</style>
