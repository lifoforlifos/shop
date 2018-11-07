<?php

/**
 * change plain number to formatted currency
 *
 * @param $number
 * @param $currency
 */
function currency_changer()
{
    $ip = geoip()->getLocation(\Request::getClientIp());

    $rate = \Swap::latest('USD/' . $ip->currency);
    $rate = $rate->getValue();
    return ['rate' => $rate, 'currency' => $ip->currency];
}
