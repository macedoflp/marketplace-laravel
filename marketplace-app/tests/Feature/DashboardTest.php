<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get(route('productslist'))->assertRedirect(route('login'));
});

test('authenticated users can visit the productslist', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get(route('productslist'))->assertOk();
});