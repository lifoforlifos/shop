<?php

namespace App\Mail;

use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;


class OrderPlaced extends Mailable
{
    use Queueable, SerializesModels;

    public $order;

    public $status;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($order, $status)
    {
        $this->order = $order;

        $this->status = $status;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ($this->status === 'verified') {
            return $this->to($this->order->billing_email, $this->order->billing_name)
                ->subject('Order from Ri7at')
                ->view('emails.orders.verified');
        } elseif ($this->status === 'sent') {
            return $this->to($this->order->billing_email, $this->order->billing_name)
                ->subject('Order from Ri7at')
                ->view('emails.orders.sent');
        } elseif ($this->status === 'problem') {
            return $this->to($this->order->billing_email, $this->order->billing_name)
                ->subject('Order from Ri7at')
                ->view('emails.orders.problem');
        }
    }
}
