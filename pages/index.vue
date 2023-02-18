<template>
  <div>
    <h1>Index</h1>
    <hr />
    <table>
      <tr>
        <td><pre>now</pre></td>
        <td>
          <pre>{{ now }}</pre>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  data() {
    return {
      now: null,
    };
  },
  created() {
    this.now = dayjs();
  },
};
</script>
