<template>
    <div>
        <h1>Square Calculation</h1>
        <div>Side <b>a</b>: {{ a }}</div>
        <div>Side <b>b</b>: {{ b }}</div>
        <div><b>Square:</b>: {{ a * b }}</div>
    </div>
</template>
<script>
	export default {
		data: () => ({
			a: 5,
			b: 2
		})

	}
</script>
